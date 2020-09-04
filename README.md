# Panache - Gesture-based machine Interface
LLP108(IoT) CW 

![Panache UI](https://github.com/maan198/Panache/blob/master/Panache/panache_ui.png)


Panache is a gesture-machine interface. The iOS app samples data from the acceleromenter in rate of 10Hz, which is sent to the cloud-based machine learning model for further prepocessing and final classification. Using the Fourier transform, the data is firstly transformed into a frequency based domain, where the pre-trained binary SVM model performs classification of the performed gestures. The classification performance of the model is >87% based on only 400 training samples. Finally, the iOS app pulls the classification result via an http request and sends a command to the wearable device (TI Sensortag) to light up a corresponding LED based on the performed gesture (green for 'accept'/ red for 'decline').

The work simulates a wearable device such as smartwatch capable of being commanded by set of gestures.

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


