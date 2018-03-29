#!/bin/bash
sudo cp -rf ./launcher.service  /lib/systemd/system;
systemctl daemon-reload;
systemctl enable launcher.service;
systemctl start launcher.service;


