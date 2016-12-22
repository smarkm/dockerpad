package org.smark.dockerpad.controller;

import java.util.ArrayList;
import java.util.List;

import org.smark.dockerpad.model.DockerHost;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
		List<DockerHost> hosts = new ArrayList<>();
		hosts.add(new DockerHost("Test", "192.168.10.128", "2375"));
		return hosts;
	}
}
