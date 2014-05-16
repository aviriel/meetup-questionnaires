#!/bin/bash

mkdir -p webpage/img
rm -f webpage/img/*

usersNumber=`wc -l participants.csv | cut -d' ' -f1`

for i in `seq 1 $usersNumber` ; 
do
	string=`sed -n $i\p participants.csv`
	email=`echo $string | cut -d, -f 1`
	surname=`echo $string | cut -d, -f 2`
	name=`echo $string | cut -d, -f 3`
	company=`echo $string | cut -d, -f 4`
	url='http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=%7B%20%27name%27%3A%27'$name'%27%2C%27surname%27%3A%27'$surname'%27%2C%27email%27%3A%27'$email'%27%2C%27company%27%3A%27'$company'%27%20%7D&chld=H|0'
	url=`echo $url | sed "s/ /%20/g"`
	curl "$url" > webpage/img/$name+$surname.png
done

