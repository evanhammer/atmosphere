#!/bin/bash

project=$1

# stop smart host
lunchy stop -x homebrew.mxcl.postgresql

# stop spring
lunchy stop -x homebrew.mxcl.postgresql93
VMS=`vboxmanage list runningvms`
if [[ $VMS == *"boot2docker-vm"* ]]
then
    echo "Shutting down Spring's VBoxHeadless."
    vboxmanage controlvm boot2docker-vm poweroff
fi

# start project
if [ $project == "sh" ]; then
    lunchy start -x homebrew.mxcl.postgresql
    echo "Start coding for Smart Host."
elif [ $project == "spring" ]; then
    lunchy start -x homebrew.mxcl.postgresql93
    echo "Start coding for Spring."
else
    echo "No project selected."
fi
