package org.smark.dockerpad.model;

public class DockerHost {

	private String name;
	private String host;
	private String port;
	
	public DockerHost() {
		super();
	}
	public DockerHost(String name, String host, String port) {
		super();
		this.name = name;
		this.host = host;
		this.port = port;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	@Override
	public String toString() {
		return "DockerHost [name=" + name + ", host=" + host + ", port=" + port + "]";
	}
	
	
}
