# Panache: Gesture-machine Interface
LLP108(IoT) CW 

![Panache UI](https://github.com/maan198/Panache/blob/master/Panache/panache_ui.png)


Panache is an AI powered gesture-machine interface. It's enabled by 3 components:
1. iOS app
2. accelerometer sensor (TI SensorTag)
3. cloud based machine learning model

The iOS app samples data from the acceleromenter in rate of 10Hz, which is directed to the cloud-based machine learning model for prepocessing and classification. Using the Fourier transform, the data is firstly transformed into a frequency based domain, where the pre-trained binary [SVM](https://en.wikipedia.org/wiki/Support_vector_machine) model performs classification of the performed gestures. The classification accuracy of the model is ~87% based on only 400 training samples. Finally, the iOS app pulls the classification result as an http request and forwards a command to the wearable device (TI Sensortag) to light up a corresponding LED based on the performed gesture (green for 'accept'/ red for 'decline').

The project simulates a wearable device such as smartwatch enabling binary command interface with a connected device. 

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


