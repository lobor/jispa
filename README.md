# Robotics-with-Raspberry-pi-2
Un projet de robot, a l'aide d'un raspberry Pi 2

## Installation de raspbian sur usb
J'ai utilisé ce [tuto](http://raspipress.com/2013/05/install-and-run-raspbian-from-a-usb-flash-drive/), qui a fonctionné du premier coup, avec cette clé usb:
![Image de l'usb](http://ecx.images-amazon.com/images/I/41hHsY5u-ZL.jpg)


## Installation d'un Text To Speech (TTS)
> J'ai d'abord essayé d'installer [Jasper](http://jasperproject.github.io/), qui est un outil d'assistance vocal, comme Siri ou "Ok Google". Bcp de probleme d'installation et de configuration. Après plusieurs 10aines d'heure de développement j'ai laissé tombé pour construire moi même mon assistant vocale.

J'ai trouvé PICO TTS ([tuto d'installation](http://rpihome.blogspot.fr/2015/02/installing-pico-tts.html)), qui fonctionne très très bien. Le seul problème est qu'il crée un fichier wav, qu'il faut lire ensuite, j'utilise aplay sur mon raspberry pie.
#### Usage
```
pico2wave -l fr-FR -w test.wav "Faites demi-tour dès que possible !" && aplay test.wav 
```

## Installation de Speech To Text (STT)
Après reflexion, j'ai choisi d'avoir une interface utilisateur basé sur les techno web, et plus spécialement d'utiliser 
[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). Il existe [annyang](https://github.com/TalAter/annyang) qui permet d'en faire simplement. Or il faut lancer le navigateur web pour acceéder a l'interface. Alors une app [electron](http://electron.atom.io/) est donc crée, que se chargera automatiquement au redémarrage du raspberry pie
