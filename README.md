# Panache
LLP108(IoT) CW 

## Panache - Gesture-based machine Interface

![Panache UI](https://github.com/maan198/Panache/blob/master/Panache/panache_ui.png)

### Main
#### HW Prerequisites
> - TI SensorTag CC2650STK - [Official documentation](https://processors.wiki.ti.com/index.php/CC2650_SensorTag_User%27s_Guide#Movement_Sensor)
> - iOS device version 9.0 or higher

#### SW Components
> - iOS app 
>   - BLE interface (sensor config, advertising, reading etc.) > [Cordova BLE](https://github.com/don/cordova-plugin-ble-central#write)
>   - Node.js & Cordova
>   - HTTP client > [Axios](https://github.com/axios/axios)
> - Deployed on cloud using [Flask](https://flask.palletsprojects.com/en/1.1.x/) & Heroku
> - Gesture recognition/classification 
>   - [Implementation Resource](https://www.researchgate.net/publication/221601229_Gesture_Recognition_with_a_3-D_Accelerometer)


[Demo](https://youtu.be/6_ibAjIdgCY)


