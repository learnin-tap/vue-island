git pull

npm run build

#删除容器
docker rm -f demo1 &> /dev/null

#启动容器
docker run -d --restart=on-failure:5\
    -p 8080:80 \
		-v /home/Gary/nginx/conf.d:/etc/nginx/conf.d \
    -v $PWD/dist:/usr/share/nginx/html \
    --name demo1 nginx



# docker run -d --restart=on-failure:5 \
#		-p 8080:80 \
#		-v /home/Gary/nginx/conf.d:/etc/nginx/conf.d \
#		-v $PWD/dist:/usr/share/nginx/html 
#		--name demo1 nginx
