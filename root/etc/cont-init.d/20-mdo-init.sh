#!/bin/sh
# Initialize mdo rule

# Ensure directories exist and have correct permissions
echo "[mdo-init] Setting up mdo"
if ! $(kldstat -q -m mac_do); then
    echo "[mdo-init] mac_do kernel module not loaded, skipping setup"
    exit 0
fi

RULE="uid=${PUID}>uid=0,gid=*,+gid=*"

case "${DISABLE_MDO}" in
    [Tt][Rr][Uu][Ee]|[Yy][Ee][Ss]|1)
        echo "[mdo-init] mac_do support disabled"
        exit 0
        ;;
    *)
        sysctl security.mac.do.rules="${RULE}"
        echo "[mdo-init] You can use mdo <command> do execute commands as root"
esac
