package org.smark.dockerpad.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.smark.dockerpad.model.DockerHost;
import org.smark.dockerpad.service.DockerHostManager;
import org.smark.dockerpad.util.DockerAPI;
import org.smark.dockerpad.util.UrlBuilder;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
/**
 * user,security and system 
 * @author smark
 */
@Controller
@RequestMapping("dockerpad")
public class DockerpadController {

	@RequestMapping("dockerhosts")
	@ResponseBody
	private Object hosts() {
		 Map<String, DockerHost> hosts = DockerHostManager.getDockerHosts();
		return hosts;
	}
	
	@RequestMapping("host")
	@ResponseBody
	private Object host(String id) {
		System.out.println(id);
		DockerHost host = DockerHostManager.get(id);
		RestTemplate client = new RestTemplate();
		String url = UrlBuilder.build(host, DockerAPI.INFO);
		HashMap info = client.getForObject(url, HashMap.class);
		host.setInfo(info);
		System.out.println(info);
		return host;
	}
	@RequestMapping("host/images")
	@ResponseBody
	private Object hostImages(String id) {
		DockerHost host = DockerHostManager.get(id);
		RestTemplate client = new RestTemplate();
		String url = UrlBuilder.build(host, DockerAPI.IMAGES);
		List images = client.getForObject(url, ArrayList.class);
		return images;
	}
	@RequestMapping("host/containers")
	@ResponseBody
	private Object hostContainers(String id) {
		DockerHost host = DockerHostManager.get(id);
		RestTemplate client = new RestTemplate();
		String url = UrlBuilder.build(host, DockerAPI.CONTAINERS_ALL);
		List images = client.getForObject(url, ArrayList.class);
		return images;
	}
	@RequestMapping("host/networks")
	@ResponseBody
	private Object hostNetworks(String id) {
		DockerHost host = DockerHostManager.get(id);
		RestTemplate client = new RestTemplate();
		String url = UrlBuilder.build(host, DockerAPI.NETWORKS);
		List images = client.getForObject(url, ArrayList.class);
		return images;
	}
	@RequestMapping("host/add")
	@ResponseBody
	private Object addHost(DockerHost host) {
		if (host!=null) {
			DockerHostManager.add(host);
		}
		return DockerHostManager.getDockerHosts();
	}
	@RequestMapping("host/update")
	@ResponseBody
	private Object updateHost(DockerHost tmpHost,String key) {
		DockerHost host = DockerHostManager.get(key);
		if (host!=null) {
			host.setHost(tmpHost.getHost());
			host.setName(tmpHost.getName());
			host.setPort(tmpHost.getPort());
			DockerHostManager.add(host);
		}
		return DockerHostManager.getDockerHosts();
	}
	
	@RequestMapping("host/remove")
	@ResponseBody
	private Object removeHost(String hostId) {
		return DockerHostManager.remove(hostId);
	}
	
	@RequestMapping("host/_ping")
	@ResponseBody
	private Object pingHost(DockerHost host) {
		RestTemplate client = new RestTemplate();
		if (client.getRequestFactory() instanceof SimpleClientHttpRequestFactory) {
			SimpleClientHttpRequestFactory cf = (SimpleClientHttpRequestFactory) client.getRequestFactory();
			cf.setConnectTimeout(3000);
		}
		String url = UrlBuilder.build(host, DockerAPI.PING);
		String object = client.getForObject(url,String.class);
		return object;
	}
	
	
}
