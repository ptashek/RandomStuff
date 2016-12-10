'''
	Based on: http://datagenetics.com/blog/july22012/index.html
	Author: Lukasz Szmit
	License: public domain
'''
from math import sqrt
from random import randint


class TwoEgg():

	def __init__(self, floors, safe_floor):
		self.eggs = 2
		self.floors = floors
		self.safe_floor = safe_floor

	def _egg_ok(self, floor):
		return floor <= self.safe_floor

	def _get_step(self, floor_count):
		'''
			In case of two eggs, the equation is:

			n + (n - 1) + (n - 2) + ... + 1 >= floor_count, or
			(n * (n + 1)) / 2 >= floor_count, or
			n^2 + n - 2 * floor_count >= 0

			(a) = 1  (b) = 1  (c) = -2 * floor_count

			The floor step, i.e. the number of floors we should advance by,
			is given by the positive root of the above quadratic equation,
			and rounded to nearest int:

			step = (-b + sqrt(b^2 - 4 * a * c)) / (2 * a)
		'''
		return int(round((-1 + sqrt(1 + 8 * floor_count)) / 2))

	def run(self):
		# current known safe floor
		safe_floor = None
		# drop counter
		drops = 0
		step = self._get_step(self.floors)
		# first floor to test equals the computed step
		floor = step
		range_start = floor
		range_end = floor + step
		# not really needed, could just as well drop eggs to zero for same effect
		stop = False
		while self.eggs > 0 and not stop:
			if range_start <= 0:
				range_start = 1
			if range_end > self.floors:
				range_end = self.floors + 1
			floor_range = range(range_start, range_end, (step - 1)
								if step > 1 else 1)
			print("\nFloor range: {}".format(floor_range))
			for test_floor in floor_range:
				drops += 1
				if self._egg_ok(test_floor):
					print("Egg survived drop from floor: {}".format(
						test_floor))
					safe_floor = test_floor
					if test_floor == self.floors:
						# no point testing further if egg survived top floor drop
						stop = True
						break
					step = self._get_step(self.floors - test_floor)
					range_start = test_floor + step
					range_end = range_start + step + 1
				else:
					print("Egg broke when dropped from floor: {}".format(
						test_floor))
					self.eggs -= 1
					if step == 1:
						break
					range_end = test_floor
					if not safe_floor is None:
						range_start = safe_floor + 1
					else:
						range_start = test_floor - step
					step = 1
					break
		return (drops, safe_floor)


if __name__ == '__main__':
	floors = 100
	picked_floor = randint(1, floors)
	drops, found_floor = TwoEgg(floors=floors, safe_floor=picked_floor).run()

	correct = "Yes" if found_floor == picked_floor else "No"
	line = "+{}+".format("=" * 40)

	print("\n{line}\n\tPicked {picked_floor} as highest safe floor\n"
		  "\tDrops: {drops}\n\tComputed safe floor: {found_floor}\n"
		  "\tCorrect: {correct}\n{line}\n".
		  format(
		  	picked_floor=picked_floor, line=line, drops=drops,
		  	found_floor=found_floor, correct=correct))
