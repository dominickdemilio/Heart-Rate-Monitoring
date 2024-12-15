
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

1. Install the Particle Workbench on your computer.  
2. Download the necessary libraries for the MAX30102 sensor:  
   - `MAX30102_Particle` (if available) or similar library for Particle devices.  
3. Clone this repository or copy the code into a new project in Particle Workbench.  

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


