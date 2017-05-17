# xbx / No Lives Worth Saving

## Game

Built on Pixi.JS (WebGL)

## Gateway

Built on SignalR (WebSockets)

## Server

Built on Azure Service Fabric (Microservices)

## Development Setup

PixiJS require to be hosted, not loaded locally from disk:

```
npm install http-server -g
```

Navigate the root folder and run

```
npm start
```

Which will run http-server and serve the src folder.

Navigate to:

[http://localhost:5000](http://localhost:5000)

## Public Endpoints

### Game URL
[https://xbx.azurewebsites.net/](https://xbx.azurewebsites.net/)

### Gateway Hubs URL
[https://xbx-gateway.azurewebsites.net/ws/hubs](https://xbx-gateway.azurewebsites.net/ws/hubs)

## License
    
MIT © [Sondre Bjellås](http://sondreb.com)
