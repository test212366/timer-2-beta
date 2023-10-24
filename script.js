(() => {
	const mainButton = document.getElementById('mainButton'),
		mainButtonEnd = document.getElementById('mainButtonEnd'),
		contentOne = document.getElementById('contentOne'),
		contentTwo = document.getElementById('contentTwo'),
		contentTree = document.getElementById('contentTree'),
		contentFour = document.getElementById('contentFour'),
		contentFive = document.getElementById('contentFive'),
		timeTarget = document.getElementById('timeTarget'),
		short = document.getElementById('short'),
		score = document.getElementById('score'),
		score__rest = document.getElementById('score__rest'),
		timer__five = document.getElementById('timer__five'),
		mainButtonP = document.getElementById('mainButtonP'),
		mainButtonEndP = document.getElementById('mainButtonEndP')
		 





	let currentPage = localStorage.getItem('page') | 0
	let currentTimerOver = localStorage.getItem('currentTimerOver') | 0
	let interval 
	let isPause = false
	let isPauseRest = false
	let isAnim = false
	let isAnimEnd = false



	const time = [
		{
			min: 20,
			sec: 0,
			left: 1200000,

			minRest: 5,
			secRest: 0,
			leftRest: 300000
		},
	 
		{
			min: 20,
			sec: 0,
			left: 1200000,

			minRest: 5,
			secRest: 0,
			leftRest: 300000
		},

		{
			min: 20,
			sec: 0,
			left: 1200000,

			minRest: 5,
			secRest: 0,
			leftRest: 300000
		},
		{
			min: 20,
			sec: 0,
			left: 1200000,
		},
		{
			min: 15,
			sec: 0,
			left: 900000
		},
	]
	
	const isNull = localStorage.getItem('min')


 
	if(localStorage.getItem('data')) {
		
		const dataGet = localStorage.getItem('data')
		let min = localStorage.getItem('min')
		let sec = localStorage.getItem('sec')



		const dataLast = new Date(dataGet)
		const dataNow = new Date()
		
		console.log(dataLast, dataNow, dataGet)

		if(dataLast.getDate() === dataNow.getDate() && dataLast.getFullYear() === dataNow.getFullYear()) {
			
			const lastH = dataLast.getHours()
			const lastM = dataLast.getMinutes()
			const lastS = dataLast.getSeconds()

			const nowH = dataNow.getHours()
			const nowM = dataNow.getMinutes()
			const nowS = dataNow.getSeconds()




			if(lastM === nowM && lastH === nowH) {
				let resultSec = nowS - lastS
				sec -= resultSec
				if(min === 0 && sec < 0) sec = 0
				sec = Math.abs(sec)

				


				localStorage.setItem('sec', sec)
			}

			if(lastH === nowH) {
				let resultMin = nowM - lastM
				min -= resultMin
				min = min

				if(min < 0) min = 0 

				localStorage.setItem('min', min)


			}




			
			console.log(lastH,lastM, lastS, nowH, nowM, nowS)

		} else {
			currentPage = 4
			currentTimerOver = 0
			localStorage.setItem('page', 4)
			localStorage.setItem('sec', 0)
			localStorage.setItem('min', 0)
			localStorage.setItem('currentTimerOver', 0)



		}


  
	}
 



	let min =  isNull === 'null' ? 1 : +localStorage.getItem('min')
	let sec =  isNull === 'null' ? 30 : +localStorage.getItem('sec')



	let left = 0


	if(min > 0 ) {
		left = min * 60000
	}
	if (sec > 0) {
		left += sec * 1000
	}
  
 
	if(currentPage == 0) {
		setTimeout(() => {
	 
			mainButtonP.style = 'opacity: 1 !important;'
		 
	
		}, 1000)
	}	
 
 


	if(currentPage) {
		score.textContent = `${currentTimerOver + 1} of 4 focus session`
		score__rest.textContent = `${currentTimerOver + 1 } of 3 short break`
		console.log(currentPage)
		switch(currentPage) {
			 
			case(1):
			 



				contentOne.classList.add('hide__content')
				contentTwo.classList.add('show__content')
				mainButton.classList.add('hide__button')
				setTimeout(() => {
					mainButtonP.textContent = 'Start Timer'
					mainButtonP.style = 'opacity: 1 !important;'
					mainButton.classList.remove('hide__button')

				}, 1000)
				break

			case(2):
				contentOne.classList.add('hide__content')

				if(currentTimerOver !== 0 && currentTimerOver < 4) {
				
						
					contentTree.classList.remove('hide__content')
					contentFour.classList.remove('show__content')
				}
				contentTwo.classList.add('hide__content')
				contentTree.classList.add('show__content')

				timeTarget.textContent = `${min}:${sec < 10 ? '0' + sec  : sec}`
				
				mainButton.classList.add('hide__button')
				setTimeout(() => {
					mainButtonP.textContent = 'Pause'
					mainButton.classList.add('pause')
					mainButtonP.style = 'opacity: 1 !important;'

					mainButton.classList.remove('hide__button')
					initTimer(min, sec, left, timeTarget,false)
				}, 1000)

				break

			case(3):

				contentOne.classList.add('hide__content')

				contentTree.classList.add('hide__content')
				contentFour.classList.add('show__content')

				short.textContent = `${min}:${sec < 10 ? '0' + sec  : sec}`

				mainButton.classList.add('hide__button')
				setTimeout(() => {
					mainButtonP.textContent = 'End short break'
					mainButton.classList.remove('pause')
					mainButtonP.style = 'opacity: 1 !important;'

					mainButton.classList.remove('hide__button')

					initTimer(min, sec, left, short, true)

				}, 1000)


				break

			case(4):
			contentOne.classList.add('hide__content')
				if(currentTimerOver === 3) {
					contentTree.classList.add('hide__content')

				}


				contentFour.classList.add('hide__content')
				contentFive.classList.add('show__content')


				mainButton.classList.add('hide__button')
				// mainButtonEnd.style = 'z-index: 1 !important;'
				
				timer__five.textContent = `${min}:${sec < 10 ? '0' + sec : sec}`
				setTimeout(() => {
					mainButtonP.textContent = 'Start new timer'
					mainButton.classList.remove('hide__button')
					mainButton.classList.remove('pause')
					mainButtonP.style = 'opacity: 1 !important;'

					// mainButtonEnd.classList.add('show__button')


					initTimer(min, sec, left, timer__five, true, true)



				}, 1000)


				break


			default:
				break
		}
		if(currentPage > 4 || currentTimerOver > 3 || localStorage.getItem('min') == 'undefined' || localStorage.getItem('min') == 'NaN') {
			if(currentTimerOver === 3) {
				contentTree.classList.add('hide__content')

			}
			currentPage = 4
			currentTimerOver = 3




			contentFour.classList.add('hide__content')
			contentFive.classList.add('show__content')
			// localStorage.setItem('page',4) 
			localStorage.setItem('currentTimerOver', 3) 

			mainButton.classList.add('hide__button')
			// mainButtonEnd.style = 'z-index: 1 !important;'
		 
			timer__five.textContent = `${time[4].min}:${time[4].sec < 10 ? '0' + time[4].sec  : time[4].sec}`
			localStorage.setItem('min', time[4].min)
			localStorage.setItem('sec', time[4].sec)
			setTimeout(() => {
				mainButtonP.textContent = 'Start new timer'
				mainButton.classList.remove('hide__button')
				mainButton.classList.remove('pause')
				mainButtonP.style = 'opacity: 1 !important;'

				// mainButtonEnd.classList.add('show__button')


				initTimer(time[4].min, time[4].sec, time[4].left, timer__five, true, true)

				 

			}, 1000)
		}
	}


	const play = () => {
		const alarm = new Audio('./source/alarm.mp3')
		alarm.play() 
	}

 

	const initTimer = (minArg, secArg, timeOut, textTarget, isRest, isLast = false) => {
		min = minArg
		sec = secArg
		 
	 


		interval = setInterval(() => {
			if(sec == 0 && min > 0 ) {
				min--
				sec = 59
				 
			} else if(min > 0 && sec !== 0){
				sec--
				 
			} else if(min === 0 && sec !== 0) {
				sec--
			}
	 
			textTarget.textContent = `${min}:${sec < 10 ? '0' + sec  : sec}`
			localStorage.setItem('min', min)
			localStorage.setItem('sec', sec)
			localStorage.setItem('data', new Date())


		}, 1000)

		setTimeout(() => {
			 
		 	
			 

			// console.log('timer is over')
				if(isLast) {



					console.log('last timer is over')

					clearInterval(interval)


					return
				}
				console.log(isRest)

		 
				if(isRest) {
					if(isPauseRest) return isPauseRest = false	
					currentTimerOver++ 
					localStorage.setItem('currentTimerOver', currentTimerOver)


					currentPage = 1
					clearInterval(interval)
				 
					eventClickMain()
					
					score.textContent = `${currentTimerOver + 1} of 4 focus session`
					score__rest.textContent = `${currentTimerOver + 1 } of 3 short break`
				} else {
					 if(isPause) return isPause = false

					 play()

					if(currentTimerOver === 3) {
						currentPage = 3

						eventClickMain()
						clearInterval(interval)
						return console.log('current === 3')
					}


					eventClickMain()
					clearInterval(interval)
				}

			 
		}, timeOut)

		 

	}




	function eventClickMain(e) {
		if(isAnim ) return
 

		if(mainButtonP.textContent === 'Start new timer' && e) {

			localStorage.setItem('page',0) 
			localStorage.setItem('currentTimerOver', 0) 
			
			location.reload()
			return



			// currentPage = 1
			// currentTimerOver = 0 
			// isPause = true
			// clearInterval(interval)
			// localStorage.setItem('page',1) 
			// localStorage.setItem('currentTimerOver', 0)



			// contentOne.classList = 'content_one hide__content'	
			// contentTwo.classList = 'content_two'	
			// contentTree.classList = 'content_tree'	
			// contentFour.classList = 'content_tree four'	
			// contentFive.classList = 'content_tree five'


			// mainButton.classList.add('hide__button')
			// score.textContent = `1 of 4 focus session`
			// score__rest.textContent = `1 of 3 short break`
			// setTimeout(() => {
			// 	mainButtonP.textContent = 'Pause'
			// 	mainButton.classList.remove('hide__button')
			// 	mainButton.classList.add('pause')
				 
			// 	mainButtonEnd.classList.remove('show__button')
 

			// }, 300)
			// setTimeout(() => {
			// 	mainButtonEnd.style = 'z-index: 0 !important;'
			// }, 1700)


		}

		if(mainButtonP.textContent === 'Pause' && e) {
			clearInterval(interval)
			isPause = true
			mainButton.classList.add('hide__button')

			mainButtonEnd.style = 'z-index: 1 !important;'
			mainButtonEndP.textContent = 'End Session'
			setTimeout(() => {
				mainButtonP.textContent = 'Play'
				mainButton.classList.remove('pause')
				mainButton.classList.remove('hide__button')
				mainButtonEnd.classList.add('show__button')

 			}, 300)
			localStorage.setItem('data', '')
			return
		}
		if(mainButtonP.textContent === 'Play' && e) {
			// // clearInterval(interval)
			// isPause = true
			// mainButton.classList.add('hide__button')
			// setTimeout(() => {
			// 	mainButtonP.textContent = 'Play'
			// 	mainButton.classList.remove('pause')
			// 	mainButton.classList.remove('hide__button')

 			// }, 1000)
			// localStorage.setItem('data', '')


			location.reload()



			return
		}

	 
		if(mainButtonP.textContent === 'Play' && currentTimerOver === 3 ) {
		 
			currentPage = 3
		}

		if(mainButtonP.textContent === 'End short break' && e) {
			isPauseRest = true
			clearInterval(interval)
			currentTimerOver++ 
			localStorage.setItem('currentTimerOver', currentTimerOver)

			currentPage = 1
			score.textContent = `${currentTimerOver + 1} of 4 focus session`
			score__rest.textContent = `${currentTimerOver + 1 } of 3 short break`
		}

		// if(mainButton.)




		currentPage++

		console.log(currentPage)
		if(currentPage <= 4)	localStorage.setItem('page', currentPage)



		isAnim = true
	 
		switch(currentPage) {
			case(1):
			 



				contentOne.classList.add('hide__content')
				contentTwo.classList.add('show__content')
				mainButton.classList.add('hide__button')
				setTimeout(() => {
					mainButtonP.textContent = 'Start Timer'
					mainButton.classList.remove('hide__button')
			 

				}, 300)
				break

			case(2):
		 

				if(currentTimerOver !== 0 && currentTimerOver < 4) {
				
						
					contentTree.classList.remove('hide__content')
					contentFour.classList.remove('show__content')
				}
				contentTwo.classList.add('hide__content')
				contentTree.classList.add('show__content')

				timeTarget.textContent = `${time[currentTimerOver].min}:${time[currentTimerOver].sec < 10 ? '0' + time[currentTimerOver].sec  : time[currentTimerOver].sec}`
				localStorage.setItem('min', time[currentTimerOver].min)
				localStorage.setItem('sec', time[currentTimerOver].sec)
				
				mainButton.classList.add('hide__button')
				setTimeout(() => {
					mainButtonP.textContent = 'Pause'
					mainButton.classList.add('pause')
					 
					mainButton.classList.remove('hide__button')
					initTimer(time[currentTimerOver].min, time[currentTimerOver].sec, time[currentTimerOver].left, timeTarget,false)
				}, 300)

				break

			case(3):

			 

				contentTree.classList.add('hide__content')
				contentFour.classList.add('show__content')

				 
				short.textContent = `${time[currentTimerOver].minRest}:${time[currentTimerOver].secRest < 10 ? '0' + time[currentTimerOver].secRest  : time[currentTimerOver].secRest}`
				localStorage.setItem('min', time[currentTimerOver].minRest)
				localStorage.setItem('sec', time[currentTimerOver].secRest)
				mainButton.classList.add('hide__button')
				setTimeout(() => {
					mainButtonP.textContent = 'End short break'
					mainButton.classList.remove('pause')

					mainButton.classList.remove('hide__button')

					initTimer(time[currentTimerOver].minRest, time[currentTimerOver].secRest, time[currentTimerOver].leftRest, short, true)
					 
				}, 300)


				break

			case(4):

				if(currentTimerOver === 3) {
					contentTree.classList.add('hide__content')

				}


				contentFour.classList.add('hide__content')
				contentFive.classList.add('show__content')


				mainButton.classList.add('hide__button')
				// mainButtonEnd.style = 'z-index: 1 !important;'
			 
				timer__five.textContent = `${time[4].min}:${time[4].sec < 10 ? '0' + time[4].sec  : time[4].sec}`
				localStorage.setItem('min', time[4].min)
				localStorage.setItem('sec', time[4].sec)
				setTimeout(() => {
					mainButtonP.textContent = 'Start new timer'
					mainButton.classList.remove('hide__button')
					mainButton.classList.remove('pause')

					// mainButtonEnd.classList.add('show__button')


					initTimer(time[4].min, time[4].sec, time[4].left, timer__five, true, true)

					 

				}, 300)


				break


			default:
				break
		}
 
 

		if(currentPage > 4 || currentTimerOver > 3  || localStorage.getItem('min') == 'undefined' || localStorage.getItem('min') == 'NaN') {
			if(currentTimerOver === 3) {
				contentTree.classList.add('hide__content')

			}
			currentPage = 4
			currentTimerOver = 3




			contentFour.classList.add('hide__content')
			contentFive.classList.add('show__content')
			// localStorage.setItem('page',4) 
			localStorage.setItem('currentTimerOver', 3) 

			mainButton.classList.add('hide__button')
			// mainButtonEnd.style = 'z-index: 1 !important;'
		 
			timer__five.textContent = `${time[4].min}:${time[4].sec < 10 ? '0' + time[4].sec  : time[4].sec}`
			localStorage.setItem('min', time[4].min)
			localStorage.setItem('sec', time[4].sec)
			setTimeout(() => {
				mainButtonP.textContent = 'Start new timer'
				mainButton.classList.remove('hide__button')
				mainButton.classList.remove('pause')

				// mainButtonEnd.classList.add('show__button')
				location.reload()
				return

				initTimer(time[4].min, time[4].sec, time[4].left, timer__five, true, true)

				 

			}, 300)
		}
	 
		setTimeout(() => {
			isAnim = false
		}, 2000);
		 
	}



	const eventEnd = () => {
		if(isAnimEnd) return
		isAnimEnd = true

		console.log('end')

		if(mainButtonEndP.textContent === 'End Session') {
			eventClickMain()
			 

			setTimeout(() => {
				isAnimEnd = false
			}, 2000);
			return
		}



		if(currentPage !== 4) return
	 
		localStorage.setItem('page',0) 
		localStorage.setItem('currentTimerOver', 0) 
		
		location.reload()
	

	}


	mainButton.addEventListener('click', eventClickMain)
	mainButtonEnd.addEventListener('click', eventEnd)

})()