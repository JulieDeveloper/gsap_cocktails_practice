import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import React from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
	const videoRef = React.useRef();
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		const heroSplit = new SplitText(".title", { type: "chars, words" });
		const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

		heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

		gsap.from(heroSplit.chars, {
			yPercent: 100, // start 100% below their normal position
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.05 // each character comes in after 0.06 seconds
		});

		gsap.from(paragraphSplit.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
			delay: 1.0 // start after the title animation is done
		});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#hero",
					start: "top top",
					end: "bottom top",
					scrub: true
				}
			})
			.to(".right-leaf", { y: 200 }, 0)
			.to(".left-leaf", { y: -200 }, 0);

		const startValue = isMobile ? "top 50%" : "center 60%"; //when the top of the element(video) reaches the 50% of the viewport versus when the center of the element reaches 60% of the viewport
		const endValue = isMobile ? "120% top" : "bottom top"; // when the element(video)'s 120% pass the top of the viewport versus when the bottom of the element reaches 40% of the viewport

		// Video Animation Timeline
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: "video",
				start: startValue,
				end: endValue,
				scrub: true,
				pin: true
			}
		});

		videoRef.current.onloadedmetadata = () => {
			tl.to(videoRef.current, {
				currentTime: videoRef.current.duration
			});
		}; //As the user scrolls, the video plays forward/backward in sync with the scroll position. Scroll down = video plays forward, scroll up = video plays backward.
	}, []);

	return (
		<>
			<section id='hero' className='noisy'>
				<h1 className='title'>MOJITO</h1>

				<img
					src='/images/hero-left-leaf.png'
					alt='left-leaf'
					className='left-leaf'
				/>
				<img
					src='/images/hero-right-leaf.png'
					alt='right-leaf'
					className='right-leaf'
				/>

				<div className='body'>
					<div className='content'>
						<div className='space-y-5 hidden md:block'>
							<p>Cool. Crisp. Classic.</p>
							<p className='subtitle'>
								Sip the Spirit <br /> of Summer
							</p>
						</div>
						<div className='view-cocktails'>
							<p className='subtitle'>
								Every cocktail on our menu is a blend of premium
								ingredients,creative flair, and timeless recipes – designed to
								delight your senses.
							</p>
							<a href='#cocktails'>View Cocktails</a>
						</div>
					</div>
				</div>
			</section>
			<div className='video absolute inset-0'>
				<video
					ref={videoRef}
					src='/videos/output.mp4'
					muted
					playsInline
					preload='auto'
				/>
			</div>
		</>
	);
};

export default Hero;
