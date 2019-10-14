migrate:
	docker build -f ./backend/prisma/Dockerfile -t dbmigrateandseed ./backend
	docker run -it --rm --network=associate-engine_default dbmigrateandseed
stripe-listen:
	stripe listen --forward-to localhost:4000/stripe-checkout
