import ky from 'ky'

export const API = ky.create({
	prefixUrl: 'http://localhost:3333',
})
