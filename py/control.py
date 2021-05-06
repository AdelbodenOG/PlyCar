#Start point of the python Scripts 
##################################

#Import of the Librarys
import pigpio
import pigpio
import time
import socketio

#Import of the other python files
import buzzer
import axis
import config 
from servoTower import PCA9685

#Turns the Servo once the whole angle
pi = pigpio.pi()
servoPIN = config.servo

#Initialise the Servo Tower
srvT = PCA9685()
srvT.setPWMFreq(50)
#pwm.setServoPulse(1,500) 
srvT.setRotationAngle(1, 100)

#0 = 20/130
#srvT.setRotationAngle(1,10)


def tryServo():
    print("Test the Front Axis")
    pi.set_servo_pulsewidth(servoPIN, 1000)
    time.sleep(2)
    pi.set_servo_pulsewidth(servoPIN, 2000)
    time.sleep(2)
    pi.set_servo_pulsewidth(servoPIN, 1500)
    time.sleep(2)
tryServo()

#Initalise the Socket IO client
socket = socketio.Client()
#Connects to the local socket 
print("Connect to local Server")
socket.connect("http://192.168.60.91")

#Listen to the chanel "car-control" and pass on to the axis script
#@socket.on("car-control")
def control(data):

    #If the gas button is pressed it sendes the gear to the axis file
    if(data['carSpeed'] == 1):
        axis.changeSpeed(data['gear'])
    else:
        axis.changeSpeed(0)

    #Changes the Angle of the Car
    axis.changeAngle((data['carAxis'] * 500) + 1500)

    #If the button is pressed the buzzer beeps
    if(data['buzzer'] == 1):
        buzzer.play()
        