import Signin from '~/pages/SignIn';
import {render, fireEvent} from '@testing-library/react-native';

describe('sign in e-mail', () => {
    it('should be a valid e-mail address', () => {
        const {getByText, getByTestId} = render(<Signin />);

        fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
        fireEvent.press(getByTestId('signin-button'));

        expect(getByTestId('email-input')).toHaveProperty(
            'value',
            'test@test.com',
        );
    });
});
