export type TApiResponse<T> =
	| {
			success: true
			data: T
	  }
	| {
			success: false
			message: string[]
	  }
