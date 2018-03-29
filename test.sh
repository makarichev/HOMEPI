#!/bin/bash

if [$1 -eq 0]
then
    echo "put unit name in argument"
    exit 0
fi
  

unit=$1
filename="/home/pi/homepi/units/${unit}/index.js"

if [ -f "$filename" ]
then

    sudo cat > /etc/systemd/system/${unit}.service << EOL
[Unit]
Description=HOMEPI ${unit} service
After=multi-user.target

[Service]
Type=idle
ExecStart=/usr/bin/node /home/pi/homepi/${unit}/index.js

[Install]
WantedBy=multi-user.target
EOL
    
    sudo systemctl enable ${unit}.service
    sudo systemctl start ${unit}.service

else
    echo "unit file ${filename} not found"
fi
