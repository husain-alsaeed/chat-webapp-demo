#!/bin/bash

yum update

yum install epel-release -y
yum update

yum install redis -y

systemctl start redis
systemctl enable redis

#unprotect

