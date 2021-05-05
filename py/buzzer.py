#The Buzzer

#Import of the Librarys
import RPi.GPIO as GPIO
import time

#Setup the GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
BUZZER = 21
GPIO.setup(BUZZER, GPIO.OUT)

#Actives the PIN 
def buzz(noteFreq, duration):
    halveWaveTime = 1 / (noteFreq * 15 )
    waves = int(duration * noteFreq)
    for i in range(waves):
       GPIO.output(BUZZER, True)
       time.sleep(halveWaveTime)
       GPIO.output(BUZZER, False)
       time.sleep(halveWaveTime)

#Setup the "Melody"
def play():
    t=0
    notes=[392,440,392,349,330,262]
    duration=[0.25,0.25,0.25,0.25,0.5,0.5]
    for n in notes:
        buzz(n, duration[t])
        time.sleep(duration[t] *0.1)
        t+=1