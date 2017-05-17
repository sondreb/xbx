using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(xbx.gateway.Startup))]

namespace xbx.gateway
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var config = new HubConfiguration();
			app.MapSignalR("/ws", config);
		}
	}
}