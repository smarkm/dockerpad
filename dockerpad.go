package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

var (
	dockerHosts map[string]DockerHost
	currentLink DockerHost
)

func main() {

	dockerHosts = make(map[string]DockerHost, 0)
	loadDB()

	StaticResource("/")
	http.HandleFunc("/api/", defaultHandler)
	http.HandleFunc("/dockerpad/", dockerpadHandler)
	if err := http.ListenAndServe("127.0.0.1:80", nil); nil != err {
		fmt.Println("server started fail ...")
	}
}

//StaticResource is static resource
func StaticResource(url string) {
	http.Handle(url, http.FileServer(http.Dir(".")))
}

func loadDB() {
	file, err := os.OpenFile("db.db", os.O_RDWR, os.ModeType)
	//dockerHosts.add()
	defer file.Close()
	//docker := DockerHost{Name: "Docker", IP: "192.168.58.136", Port: 2375}
	bs, err := ioutil.ReadAll(file)
	err = json.Unmarshal(bs, &dockerHosts)
	if nil != err {
		println(err)
	}
	fmt.Println(string(bs))
	fmt.Println(dockerHosts)
}
func syncDockers(docker DockerHost, act string, Ids ...string) {
	file, err := os.OpenFile("db.db", os.O_RDWR, os.ModeType)
	defer file.Close()
	if act == "c" {
		id := strconv.Itoa(time.Now().Nanosecond())
		dockerHosts[id] = docker
	}
	if act == "d" {
		delete(dockerHosts, Ids[0])
	}
	if act == "u" {
		dockerHosts[Ids[0]] = docker
	}

	bs, err := json.Marshal(dockerHosts)
	if nil != err {
		println(err)
	}
	num, err := file.Write(bs)
	println(num, err)
}
func defaultHandler(w http.ResponseWriter, r *http.Request) {
	URL := r.URL.String()
	action := strings.TrimPrefix(URL, "/api")
	urlStr := "http://" + currentLink.Host + ":" + strconv.Itoa(currentLink.Port) + action

	println(urlStr)
	req, err := http.NewRequest(r.Method, urlStr, r.Body)
	res, err := http.DefaultClient.Do(req)
	//defer req.Body.Close()
	//defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if nil != err {
		println(err.Error())
	}
	fmt.Fprintf(w, string(body))
}

func dockerpadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Println(r.PostForm)
	action := strings.TrimPrefix(r.URL.String(), "/dockerpad")
	key := r.PostForm.Get("key")
	fmt.Println(action, "key", key)

	if action == "/dockerhosts" {
		bs, err := json.Marshal(dockerHosts)
		if nil != err {
			println(err)
		}
		fmt.Fprintf(w, string(bs))
	}

	if action == "/add" {
		name := r.FormValue("Name")
		host := r.FormValue("Host")
		port, err := strconv.Atoi(r.FormValue("Port"))
		checkErr(err)
		docker := DockerHost{Name: name, Host: host, Port: port}
		syncDockers(docker, "c")
	}
	if action == "/edit" {
		name := r.FormValue("Name")
		host := r.FormValue("Host")
		port, err := strconv.Atoi(r.FormValue("Port"))
		checkErr(err)
		docker := DockerHost{Name: name, Host: host, Port: port}
		syncDockers(docker, "u", key)
	}
	if action == "/remove" {
		syncDockers(*new(DockerHost), "d", key)
	}
	if action == "/use" {
		currentLink = DockerHost(dockerHosts[key])
	}
}

func checkErr(err error) {
	fmt.Println(err)
}

//DockerHost is docker short cust
type DockerHost struct {
	Name string
	Host string
	Port int
}
