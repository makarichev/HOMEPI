cp /home/pi/homepi/install/pi/launcher.service  /lib/systemd/system;
systemctl daemon-reload;
systemctl enable launcher.service;
systemctl start launcher.service;


