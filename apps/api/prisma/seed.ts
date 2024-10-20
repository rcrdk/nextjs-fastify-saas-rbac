import { fakerPT_BR as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

function capitalizeFirstLetter(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1)
}

async function seed() {
	await prisma.user.deleteMany()
	await prisma.organization.deleteMany()

	const passwordHashed = await hash('123456', 1)

	const [userOne, userTwo, userThree] = await prisma.user.createManyAndReturn({
		data: [
			{
				name: 'John Doe',
				email: 'johndoe@example.com',
				emailValidatedAt: new Date(),
				avatarUrl: faker.image.avatarGitHub(),
				passwordHash: passwordHashed,
			},
			{
				name: faker.person.fullName(),
				email: faker.internet.email().toLowerCase(),
				emailValidatedAt: new Date(),
				avatarUrl: faker.image.avatarGitHub(),
				passwordHash: passwordHashed,
			},
			{
				name: faker.person.fullName(),
				email: faker.internet.email().toLowerCase(),
				emailValidatedAt: new Date(),
				avatarUrl: faker.image.avatarGitHub(),
				passwordHash: passwordHashed,
			},
		],
	})

	await prisma.organization.create({
		data: {
			name: 'Acme Inc (admin)',
			domain: 'acme.com',
			shouldAttachUsersByDomain: true,
			domainValidatedAt: new Date(),
			slug: 'acme-inc-admin',
			avatarUrl: faker.image.avatarGitHub(),
			ownerId: userOne.id,
			projects: {
				createMany: {
					data: [
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
					],
				},
			},
			members: {
				createMany: {
					data: [
						{
							userId: userOne.id,
							role: 'ADMIN',
						},
						{
							userId: userTwo.id,
							role: 'MEMBER',
						},
						{
							userId: userThree.id,
							role: 'BILLING',
						},
					],
				},
			},
		},
	})

	await prisma.organization.create({
		data: {
			name: 'Acme Inc (member)',
			slug: 'acme-inc-member',
			avatarUrl: faker.image.avatarGitHub(),
			ownerId: userTwo.id,
			projects: {
				createMany: {
					data: [
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
					],
				},
			},
			members: {
				createMany: {
					data: [
						{
							userId: userOne.id,
							role: 'MEMBER',
						},
						{
							userId: userTwo.id,
							role: 'ADMIN',
						},
						{
							userId: userThree.id,
							role: 'BILLING',
						},
					],
				},
			},
		},
	})

	await prisma.organization.create({
		data: {
			name: 'Acme Inc (billing)',
			slug: 'acme-inc-billing',
			avatarUrl: faker.image.avatarGitHub(),
			ownerId: userTwo.id,
			projects: {
				createMany: {
					data: [
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
						{
							name: capitalizeFirstLetter(faker.lorem.words(5)),
							slug: faker.lorem.slug(5),
							description: faker.lorem.paragraph(),
							avatarUrl: faker.image.avatarGitHub(),
							ownerId: faker.helpers.arrayElement([
								userOne.id,
								userTwo.id,
								userThree.id,
							]),
						},
					],
				},
			},
			members: {
				createMany: {
					data: [
						{
							userId: userOne.id,
							role: 'BILLING',
						},
						{
							userId: userTwo.id,
							role: 'ADMIN',
						},
						{
							userId: userThree.id,
							role: 'MEMBER',
						},
					],
				},
			},
		},
	})
}

seed()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
	})
