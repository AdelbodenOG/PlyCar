#Controls the servo & the engine

#Import of the Librarys
import pigpio
import time
import config

#setup the pins 
servoPIN = config.servo
enginePIN = config.engine

#Init the pi object to control the servo & engine
pi = pigpio.pi()

#Checks the angle, that its not to wide or to short
def duty(angle):
    maxAngle = 2000
    minAngle = 1100
    if(angle <= minAngle):
       return minAngle

    elif(angle >= maxAngle):
        return maxAngle
    
    else:
        return angle

#Controls the servo
def changeAngle(angle):
    pi.set_servo_pulsewidth(servoPIN, duty(angle))

#Controls the engine 
def changeSpeed(speed):
   pi.set_servo_pulsewidth(enginePIN, speed * 100 + 1500)