#!/bin/bash
RED='\033[0;31m'
NC='\033[0m' # No Color
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m' 
check_stack () {
        echo -e "${PURPLE}-----------------------------------------------${NC}"
        stack="$1"
        docker stack services $stack |
        while read line
        do
                # echo "$line"
                read replicas <<< $( echo $line| awk '{print $4}')
                read service <<< $( echo $line| awk '{print $2}')
                # echo "$service"
                if [[ "$replicas" != 'REPLICAS' ]];  then
                        sttarr=(`echo $replicas | tr '/' ' '`)
                        var0=`echo ${sttarr[0]} | sed 's/ *$//g'`
                        var1=`echo ${sttarr[1]} | sed 's/ *$//g'`
                        if [[ ${#sttarr[*]} != 2 || $var0 != $var1 ]]; then
                                echo -e "Services ${RED}$service${NC} is not ready. Replicas info: ${YELLOW}$replicas${NC}"
                                # echo "Sleeping 2(s)"
                                sleep 1;
                                check_stack "$stack"
                                return
                        else 
                                echo -e "Services ${GREEN}$service${NC} is ready. Replicas info: ${YELLOW}$replicas${NC}"
                        fi
                fi
        done
}
docker stack rm db
docker stack rm yts

docker network rm yts-network
#kiem tra trang thai yts-network da xoa duoc chua
while true
do
        count=`docker network ls | grep " yts-network" | wc -l`
        echo "Removing yts-network..."
        if [[ $count -eq 0 ]]; then
                echo -e "${GREEN}yts-network is removed${NC}"
                break;
        fi
        sleep 2
done

#Create network
echo -e "${PURPLE}=======================================================================================${NC}"
echo -e "${YELLOW}Creating new yts-network${GREEN}"
docker network create yts-network -d overlay --attachable
echo -e "${NC}"

#Pull docker images
echo -e "${PURPLE}=======================================================================================${NC}"
echo -e "${YELLOW}Start pull docker images${NC}"
docker pull mongo:latest
# Stack tools
echo -e "Start stack ${YELLOW}yts${NC}"
docker stack deploy -c swarm/mongo.yml db --with-registry-auth --resolve-image always
check_stack "db"
docker stack deploy -c swarm/webapp.yml yts --with-registry-auth --resolve-image always
check_stack "yts"