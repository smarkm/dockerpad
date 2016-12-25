package org.smark.dockerpad.util;

import org.smark.dockerpad.model.DockerHost;

public class UrlBuilder {

	public static String build(DockerHost host,String action) {
		StringBuilder sb = new StringBuilder("http://");
		sb.append(host.getHost()).append(":")
		  .append(host.getPort()).append("/")
		  .append(action);
		return sb.toString();
	}
}
