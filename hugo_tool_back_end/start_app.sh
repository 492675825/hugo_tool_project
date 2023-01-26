#!bin/bash
ps -aux | grep python|xargs kill -9
nohup python3 manage.py runserver 0:80 > start_log.log 2>&1 &
