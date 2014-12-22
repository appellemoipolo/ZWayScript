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
			zway.devices[34].instances[0].SwitchMultilevel.Set(30);

			clicType = 'ON';
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
			zway.devices[34].instances[0].SwitchMultilevel.Set(99);

			clicType = 'DOUBLEON';
		break;
		case 26:
			zway.devices[38].instances[0].SwitchMultilevel.Set(0);
			zway.devices[34].instances[0].SwitchMultilevel.Set(0);
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

			http.request({url:"http://10.0.1.100:5005/Salon/volume/9"});
			http.request({url:"http://10.0.1.100:5005/Salon/pause"});
		break;
}

	http.request({
		url: 'http://10.0.1.100:5005/Salon/state',
		async: true,
		success: function(res) {
			//debugPrint('SONOS - success');
			//debugPrint(res.data);
			//debugPrint(res.data.playerState);
			// sonosState: 'STOPPED';
			// sonosState: 'PLAYING';
			if (res.data.playerState != 'PLAYING') {
				switch (clicType) {
					case 'ON':
						http.request({url:"http://10.0.1.100:5005/Salon/volume/9"});
						http.request({url:"http://10.0.1.100:5005/Salon/play"});
					break;
					case 'DOUBLEON':
						http.request({url:"http://10.0.1.100:5005/Salon/volume/9"});
						http.request({url:"http://10.0.1.100:5005/Salon/play"});
					break;
				}	
			}
		},
		error: function(res) {
			debugPrint('SONOS - error');
		}
	});

});
