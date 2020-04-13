/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function set_status(message)
{
let status = document.getElementById('status')
status.textContent = message
}

//front-end to display real-time metrics on the screen
function metrics(sensor, x, y, z)
{
    let x_element = document.getElementById(sensor + "_x")
    x_element.textContent = Math.round(x*100000)/100000
    let y_element = document.getElementById(sensor + "_y")
    y_element.textContent = Math.round(y*100000)/100000
    let z_element = document.getElementById(sensor + "_z")
    z_element.textContent = Math.round(z*100000)/100000
}


var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: async function () {
        
        set_status("ready")
        const DEVICE_ID = "05F41F0F-A542-6676-529D-D7769D7D8068"
        let scanning = false
        let connect_status = false
        const start_scanning_button = document.getElementById('SCAN')
        const stop_scanning_button = document.getElementById('SCANT')
        const disconnect_button = document.getElementById('DISCONNECT')
//        let GYRO_DATA = []
        let ACCEL_DATA = []
        
        start_scanning_button.addEventListener('click', () => {
            if (!scanning) {
                scanning = true
                set_status('scanning...')
                try
                {
                   ble.isEnabled(function () {
                       const SERVICE_ID = "f000aa80-0451-4000-b000-000000000000"
                       const CHAR_ID_config = "f000aa82-0451-4000-b000-000000000000"
                       const CHAR_ID_data = "f000aa81-0451-4000-b000-000000000000"
                       const CHAR_ID_period = "f000aa83-0451-4000-b000-000000000000"
                       ble.startScan([], (device) => {
                        
                           if (device.id == DEVICE_ID) {
                               ble.connect(DEVICE_ID, () => {
                                    connect_status = true
                                    set_status('connected!')

                                   // Update (enable) gyro and accel in sensor movement configuration
                                   // Set first 6bits of the 2byte config to 1
                                   var config_data = new Uint8Array(2);
                                   config_data[0] = 0x3F;
                                   config_data[1] = 0x00;

                                    var config_period = new Uint8Array(1);
                                    config_period[0] = 0x0A;
                                    
                                   // Write to config
                                   ble.write(DEVICE_ID, SERVICE_ID, CHAR_ID_config, config_data.buffer)
                                   ble.write(DEVICE_ID, SERVICE_ID, CHAR_ID_period, config_period.buffer)
                                    
                                   ble.startNotification(DEVICE_ID, SERVICE_ID, CHAR_ID_data, async (buffer) => {
                                       /*
                                        * https://processors.wiki.ti.com/index.php/CC2650_SensorTag_User%27s_Guide#Movement_Sensor
                                        * The data consists of nine 16-bit signed values, one for each axis. The order in the data is Gyroscope, Accelerometer, Magnetomer.
                                        */

                                       const data = new Int16Array(buffer);

//                                       console.log(`GYRO: X: ${(data[0] * 1.0) / (65536 / 500)}`)
//                                       console.log(`GYRO: Y: ${(data[1] * 1.0) / (65536 / 500)}`)
//                                       console.log(`GYRO: Z: ${(data[2] * 1.0) / (65536 / 500)}`)

                                       const GYRO_X = (data[0] * 1.0) / (65536 / 500)
                                       const GYRO_Y = (data[1] * 1.0) / (65536 / 500)
                                       const GYRO_Z = (data[2] * 1.0) / (65536 / 500)

//                                       GYRO_DATA.push([GYRO_X,GYRO_Y,GYRO_Z])
//
                                       metrics('gyro',GYRO_X, GYRO_Y, GYRO_Z)

                                       const ACCEL_X = (data[3] * 1.0) / (32768 / 8)
                                       const ACCEL_Y = (data[4] * 1.0) / (32768 / 8)
                                       const ACCEL_Z = (data[5] * 1.0) / (32768 / 8)
                                       
                                       ACCEL_DATA.push([ACCEL_X,ACCEL_Y,ACCEL_Z])
                                       
                                       metrics('accel', ACCEL_X,ACCEL_Y,ACCEL_Z)
                                       
                                       
//                                       console.log('GYRO:', GYRO_X, GYRO_Y, GYRO_Z)
                                       console.log('ACCEL:', ACCEL_X, ACCEL_Y, ACCEL_Z)
                                       
                                       if(ACCEL_DATA.length >= 100){
                                            const { data } = await axios.post('http://3e9387c7.ngrok.io/track_data', ACCEL_DATA)
                                        //        if data = 1 e.g - kod pre response do senzora
//                                                    response do senzora - dokumentacia
                                            ACCEL_DATA = []
                                       }
                                   }, (failure) => {
                                       console.log("Failed to read characteristic from device.");
                                   });
                               }, () => {
                                   console.log("failure")
                               });

                               ble.stopScan()
                           }
                       }, (error) => {});
                   })
               } catch (e) {
                   console.log(e)
               }
            }
        })
        
        stop_scanning_button.addEventListener('click', () => {
            if (scanning) {
                scanning = false
                set_status('ready')
                ble.stopScan()
            }
        })
        disconnect_button.addEventListener('click', () => {
                   if (connect_status) {
                       connect_status = false
                       set_status('Disconnected & ready!')
                       ble.disconnect(DEVICE_ID)
                   }
               })
    }
};

app.initialize();


    
