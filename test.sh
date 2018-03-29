#!/bin/bash
unit="launcher";

sudo cat > /systemd/system/${unit}.service << EOL
[Unit]
Description=HOMEPI ${unit} service
After=multi-user.target

[Service]
Type=idle
ExecStart=/usr/bin/node /home/pi/homepi/${unit}/index.js

[Install]
WantedBy=multi-user.target
EOL


sudo syustemctl enable ${unit}.service
sudo syustemctl start ${unit}.service