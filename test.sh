#!/bin/bash
unit="launcher";

cat > FILE.txt << EOL
[Unit]
Description=HOMEPI ${unit} service
After=multi-user.target

[Service]
Type=idle
ExecStart=/usr/bin/node /home/pi/homepi/${unit}/index.js

[Install]
WantedBy=multi-user.target
EOL