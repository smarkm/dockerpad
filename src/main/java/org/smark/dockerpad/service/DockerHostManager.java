package org.smark.dockerpad.service;

import java.util.HashMap;
import java.util.Map;

import org.smark.dockerpad.model.DockerHost;

public class DockerHostManager {
	static Map<String, DockerHost> dockerHosts = new HashMap<>();
	
	static{
		init();
	}
	private DockerHostManager() {
	}
	
	public static void init() {
		DockerHost host = new DockerHost("Test", "192.168.10.129", "2375");
		DockerHostManager.add(host);
	}
	public static void add(DockerHost host){
		dockerHosts.put(host.getId(), host);
	}
	
	public static DockerHost remove(String key){
		return dockerHosts.remove(key);
	}
	
	public static DockerHost get(String key){
		return dockerHosts.get(key);
	}

	public static Map<String, DockerHost> getDockerHosts() {
		return dockerHosts;
	}
}
