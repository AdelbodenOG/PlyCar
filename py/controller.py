#Start point of the python Scripts 
##################################

#Import of the Librarys
import pigpio
import pigpio
import time
import socketio

#Import of the other python files
import buzzer
import engine
import config 

#Turns the Servo once the whole angle
pi = pigpio.pi()
servoPIN = config.servo

def tryServo():
    pi.set_servo_pulsewidth(servoPIN, 1000)
    time.sleep(2)
    pi.set_servo_pulsewidth(servoPIN, 2000)
    time.sleep(2)
    pi.set_servo_pulsewidth(servoPIN, 1500)
    time.sleep(2)
    print("test")
tryServo()

#Initalise the Socket IO client
socket = socketio.Client()
#Connects to the local socket 
socket.connect(config.server)

#Listen to the chanel "car-control" and pass on to the engine script
@socket.on("car-control")
def control(data):

    #If the gas button is pressed it sendes the gear to the engine file
    if(data['carSpeed'] == 1):
        engine.changeSpeed(data['gear'])
    else:
        engine.changeSpeed(0)

    #Changes the Angle of the Car
    engine.changeAngle((data['carAxis'] * 500) + 1500)

    #If the button is pressed the buzzer beeps
    if(data['buzzer'] == 1):
        buzzer.play()