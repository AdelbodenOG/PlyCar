import pigpio
import time

enginePIN = 14

pi = pigpio.pi()

print("go")
pi.set_servo_pulsewidth(enginePIN, 1600)
time.sleep(2)
pi.set_servo_pulsewidth(enginePIN, 1500)