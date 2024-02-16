import React, { Component } from 'react';
import Lottie from 'react-lottie';
import BearAnimation from '../../assets/animation/CuteBear.json'; // Import the animation JSON file

class AnimationPage extends Component {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: BearAnimation, // Use the imported animation data
            renderer: 'svg'
        };

        return (
            <div>
                <Lottie
                    options={defaultOptions}
                    height={500}
                    width={500}
                />
            </div>
        );
    }
}

export default AnimationPage;
