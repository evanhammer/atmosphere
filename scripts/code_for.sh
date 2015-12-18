#!/bin/bash

project=$1

lunchy stop -x homebrew.mxcl.postgresql
lunchy stop -x homebrew.mxcl.postgresql93

if [ $project == "sh" ]; then
    echo "Start coding for Smart Host."
    lunchy start -x homebrew.mxcl.postgresql
elif [ $project == "spring" ]; then
    echo "Start coding for Spring."
    lunchy start -x homebrew.mxcl.postgresql93
else
    echo "No project selected."
fi
