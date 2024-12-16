
# Heartbeat Sensor Project  

This project uses the **MAX30102 pulse oximeter and heart rate sensor** in combination with a **Particle Argon microcontroller** to measure and display heartbeat and blood oxygen data.  

## Features  

- Account Creation
-Login/Logout
-Required Strong Password
-Password Changes
-Device Registration
-Periodic Measurements
-Weekly Summary
-Offline Storage

## Links  

- **Server**: [Heartbeat Sensor Web Application](serverlink)  
- **Video**: [Project Video](videolink)  


## Demo Account  

Use the following login credentials to access an existing user account with recently collected data:  

- **Email**: user@email.com 
- **Password**: Password1!  

Log in to explore features such as periodic measurements and the weekly summary of heartbeat data.


## Components  

- **MAX30102 Sensor**: Pulse oximeter and heart rate monitor  
- **Particle Argon**: Wi-Fi-enabled microcontroller for data processing and communication  
- Supporting components: Breadboard, jumper wires, power supply, antenna  

## Setup Instructions  

### Hardware Connections  

1. Connect the **MAX30102 sensor** to the **Particle Argon** as follows:  
   - **VIN** → **3.3V** on the Argon  
   - **GND** → **GND** on the Argon  
   - **SCL** → **D1 (SCL)** on the Argon  
   - **SDA** → **D0 (SDA)** on the Argon   

### Software Setup  

1. Install Visual Studio Code
2. Clone the Heart-Rate-Monitoring-Frontend repository from github **Frontend**: [Frontend](https://github.com/dominickdemilio/Heart-Rate-Monitoring-Frontend.git) 
3. Clone the Heart-Rate-Monitoring-Backend repository from github **Backend**: [Backend](https://github.com/dominickdemilio/Heart-Rate-Monitoring-Backend.git)
4. In the Visual Studio Code terminal for the frontend cd frontend
5. In the Visual Studio Code terminal for the frontend npm install
6. In the Visual Studio Code terminal for the frontend npm start
7. Install MongoDB: [MongoDB](mongolink)
8. In the Visual Studio Code terminal for the backend node app.js

### Upload the Code  

1. Compile the code in Particle Workbench.  
2. Flash the code to the Particle Argon.  
3. Open a serial monitor to view real-time heartbeat data or configure a dashboard for IoT-based visualization.  

## Usage  

1. Power up the device.  
2. Place your fingertip gently on the MAX30102 sensor.  
3. The sensor will begin detecting your heartbeat, and data will be processed by the Particle Argon.  
4. View the results via the serial monitor or your configured IoT platform.  

## Troubleshooting  

- **No Data Output**: Check hardware connections and ensure the correct I2C pins are used.  
- **Inconsistent Readings**: Ensure the sensor is not obstructed and your fingertip is placed correctly.  
- **Compilation Errors**: Verify that all required libraries are installed.  


## Acknowledgments  

- Particle documentation and community  
- MAX30102 sensor datasheet and resources  


