#!/bin/bash
{ # try1
    echo looking for... $1
    xhost +local:docker
    docker inspect --format . $1 &&
    # try2 with a shortcut
    {
        make _start_container ||
        make _attach
    }

} || { # catch
   make _run_container
  #  save log for exception 
}
