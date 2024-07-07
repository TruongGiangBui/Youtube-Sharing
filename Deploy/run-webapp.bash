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
docker stack rm yts

docker stack deploy -c swarm/webapp.yml yts --with-registry-auth --resolve-image always
check_stack "yts"