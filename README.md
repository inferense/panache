# Panache
LLP108(IoT) CW 

## Panache - Gesture-based machine Interface

![Panache UI](https://github.com/maan198/Panache/blob/master/Panache/panache_ui.png)


Panache is a gesture-machine interface. The iOS app samples data from the acceleromenter in 10Hz which is being sent to the cloud based machine learning model for further prepocessing and final classification. Using the Fourier transform, the data is transformed into a frequency based domain first, and using SVM the model performs an accurate classification of the pre-trained binary gestures. The classification performance of the model is >87%. Finally, the app pulls a classification result through an http request and sends a command to light up a LED corresponding to the performed gesture. 

The Panache work simulates a wearable device commanded by set of gestures.

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


