zway.devices[40].instances[0].commandClasses[43].data.currentScene.bind(function() {

	var clicType = 'NONE';

	switch (this.value) {
		case 16:
			zway.devices[29].instances[1].SwitchBinary.Set(255);
			zway.devices[29].instances[2].SwitchBinary.Set(255);
			zway.devices[37].instances[0].SwitchMultilevel.Set(100);
			zway.devices[28].instances[0].SwitchMultilevel.Set(30);
			zway.devices[36].instances[0].SwitchMultilevel.Set(30);
			zway.devices[35].instances[0].SwitchMultilevel.Set(100);
			zway.devices[30].instances[0].SwitchMultilevel.Set(30);
			zway.devices[31].instances[0].SwitchMultilevel.Set(30);
			zway.devices[32].instances[0].SwitchMultilevel.Set(30);
			zway.devices[33].instances[0].SwitchMultilevel.Set(30);
			zway.devices[41].instances[0].SwitchMultilevel.Set(30);

			clicType = 'SIMPLEON';

		break;
		case 14:
			zway.devices[29].instances[1].SwitchBinary.Set(255);
			zway.devices[29].instances[2].SwitchBinary.Set(255);
			zway.devices[37].instances[0].SwitchMultilevel.Set(99);
			zway.devices[28].instances[0].SwitchMultilevel.Set(99);
			zway.devices[36].instances[0].SwitchMultilevel.Set(99);
			zway.devices[35].instances[0].SwitchMultilevel.Set(99);
			zway.devices[30].instances[0].SwitchMultilevel.Set(99);
			zway.devices[31].instances[0].SwitchMultilevel.Set(99);
			zway.devices[32].instances[0].SwitchMultilevel.Set(99);
			zway.devices[33].instances[0].SwitchMultilevel.Set(99);
			zway.devices[41].instances[0].SwitchMultilevel.Set(99);

			clicType = 'DOUBLEON';

		break;
		case 26:
			zway.devices[38].instances[0].SwitchMultilevel.Set(0);
			zway.devices[41].instances[0].SwitchMultilevel.Set(0);
			zway.devices[33].instances[0].SwitchMultilevel.Set(0);
			zway.devices[32].instances[0].SwitchMultilevel.Set(0);
			zway.devices[31].instances[0].SwitchMultilevel.Set(0);
			zway.devices[30].instances[0].SwitchMultilevel.Set(0);
			zway.devices[35].instances[0].SwitchMultilevel.Set(0);
			zway.devices[36].instances[0].SwitchMultilevel.Set(0);
			zway.devices[28].instances[0].SwitchMultilevel.Set(0);
			zway.devices[37].instances[0].SwitchMultilevel.Set(0);
			zway.devices[29].instances[1].SwitchBinary.Set(0);
			zway.devices[29].instances[2].SwitchBinary.Set(0);

			clicType = 'SIMPLEOFF';
		break;
		case 24:
			zway.devices[38].instances[0].SwitchMultilevel.Set(0);
			zway.devices[41].instances[0].SwitchMultilevel.Set(0);
			zway.devices[33].instances[0].SwitchMultilevel.Set(0);
			zway.devices[32].instances[0].SwitchMultilevel.Set(0);
			zway.devices[31].instances[0].SwitchMultilevel.Set(0);
			zway.devices[30].instances[0].SwitchMultilevel.Set(0);
			zway.devices[35].instances[0].SwitchMultilevel.Set(0);
			zway.devices[36].instances[0].SwitchMultilevel.Set(0);
			zway.devices[28].instances[0].SwitchMultilevel.Set(0);
			zway.devices[37].instances[0].SwitchMultilevel.Set(0);
			zway.devices[29].instances[1].SwitchBinary.Set(0);
			zway.devices[29].instances[2].SwitchBinary.Set(0);

			clicType = 'DOUBLEOFF';
			
// http://10.0.1.165/jsonrpc?request={%22jsonrpc%22:%222.0%22,%22method%22:%22GUI.ShowNotification%22,%22params%22:{%22title%22:%22Salut%20nana%20!%22,%22message%22:%22Bisous%20de%20ton%20polichou%20!%22,%22image%22:%22http://180degreehealth.com/wp-content/uploads/2012/01/mr.-hankey.jpg?b7ac83%22},%22id%22:1}

			http.request({url:'http://10.0.1.165/jsonrpc?request={%22jsonrpc%22:%222.0%22,%22method%22:%22Player.Stop%22,%22params%22:{%22playerid%22:1},%22id%22:1}'});
			http.request({url:"http://10.0.1.105:5005/Salon/volume/9"});
			http.request({url:"http://10.0.1.105:5005/Salon/pause"});
		break;
	}

	function sonosTts() {
		try {
			debugPrint('sonosWeather launch');
			system('/opt/node/bin/node /home/pi/GitProjects/NodeSonosTtsWeather/main.js > /home/pi/log/nodeSonosWeather.log');
		} catch(e) {
			debugPrint('sonosWeather error: ' + e);
		}
	}

	http.request({
		url: 'http://10.0.1.105:5005/Salon/state',
		async: true,
		contentType: 'application/json',
		success: function(res) {
			if (res.data.playerState !== 'PLAYING') {
				switch (clicType) {
					case 'SIMPLEON':
						http.request({url:"http://10.0.1.105:5005/Salon/volume/9"});
						http.request({url:"http://10.0.1.105:5005/Salon/play"});
						//sonosTts();
					break;
					case 'DOUBLEON':
						http.request({url:"http://10.0.1.105:5005/Salon/volume/9"});
						http.request({url:"http://10.0.1.105:5005/Salon/play"});
						//sonosTts();
					break;
				}	
			}
		},
		error: function(res) {
			debugPrint('SONOS - error');
		}
	});
});
