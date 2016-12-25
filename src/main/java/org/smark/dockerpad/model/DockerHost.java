package org.smark.dockerpad.model;

import java.util.Map;
import java.util.UUID;

public class DockerHost {
	private String id;
	private String name;
	private String host;
	private String port;
	private Map<String, Object> info;
	
	public DockerHost() {
		id = UUID.randomUUID().toString();
	}
	public DockerHost(String name, String host, String port) {
		super();
		id = UUID.randomUUID().toString();
		this.name = name;
		this.host = host;
		this.port = port;
	}
	
	public String getId() {
		return id;
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
	
	public Object getInfo() {
		return info;
	}
	public void setInfo(Map<String, Object> info) {
		this.info = info;
	}
	@Override
	public String toString() {
		return "DockerHost [id=" + id + ", name=" + name + ", host=" + host + ", port=" + port + "]";
	}
	
	
}
