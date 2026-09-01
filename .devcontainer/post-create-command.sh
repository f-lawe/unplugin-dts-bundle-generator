#!/bin/sh

# Copy config files from host
node -e "import('node:https').then(https => https.get('https://gist.githubusercontent.com/f-lawe/f2b99dabbc761a0f90b44952ac021363/raw/copy_if_exists.sh', res => res.pipe(require('node:fs').createWriteStream('./copy_if_exists.sh'))))"
chmod +x ./copy_if_exists.sh

./copy_if_exists.sh /tmp/host/.bashrc /home/docker/.bashrc 1000:1000 755 644
./copy_if_exists.sh /tmp/host/kilo.jsonc /home/docker/.config/kilo/kilo.jsonc 1000:1000 755 644
./copy_if_exists.sh /tmp/host/kilo /home/docker/.local/share/kilo 1000:1000 755

rm ./copy_if_exists.sh

# Installs
sudo apt install -y ssh

# History persistence
if [ ! -f /home/docker/.bash/history ]; then
  touch /home/docker/.bash/history
fi

sudo chown -R docker:docker /home/docker/.bash
rm -f /home/docker/.bash_history
ln -s /home/docker/.bash/history /home/docker/.bash_history
