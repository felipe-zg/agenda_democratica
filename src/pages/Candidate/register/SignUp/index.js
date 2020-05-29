import React, {useState, useRef} from 'react';
import {View, Image} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Container from '../../../../components/Container';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import {Form, AboutView, AboutInput, ImagePickerView, Photo} from './styles';

const SignUp = ({navigation}) => {
    const [formIndex, setFormIndex] = useState(1);
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [name, setName] = useState('');
    const [campaignName, setCampaignName] = useState('');
    const [party, setParty] = useState('');
    const [number, setNumber] = useState('');
    const [id, setId] = useState('');

    const [photo, setPhoto] = useState(null);
    const [about, setAbout] = useState('');

    const confirmEmailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    function handleSignUp() {
        navigation.replace('CandidateDashBoardScreen');
    }

    function handleImagePicker() {
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                let source = response;
                setPhoto(source);
                return;
            } else {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                    return;
                }
                if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                    return;
                }
            }
        });
    }

    function firstForm() {
        return (
            <>
                <Input
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />
                <Input
                    ref={confirmEmailRef}
                    placeholder="Confirme seu e-mail"
                    value={confirmEmail}
                    onChangeText={setConfirmEmail}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <Input
                    ref={passwordRef}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                />
                <Input
                    ref={confirmPasswordRef}
                    placeholder="Digite sua senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={() => setFormIndex(2)}
                />
                <Button title="Próximo" callback={() => setFormIndex(2)} />
            </>
        );
    }

    function secondForm() {
        return (
            <>
                <Input
                    placeholder="Nome completo do candidato"
                    value={name}
                    onChangeText={setName}
                    autoCorrect={false}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />
                <Input
                    placeholder="Nome de campanha do candidato"
                    value={campaignName}
                    onChangeText={setCampaignName}
                    autoCorrect={false}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />
                <Input
                    placeholder="Partido do candidato"
                    value={party}
                    onChangeText={setParty}
                    autoCorrect={false}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />
                <Input
                    placeholder="Número do candidato"
                    value={number}
                    onChangeText={setNumber}
                    keyboardType="numeric"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />
                <Input
                    placeholder="Número de identificação da candidatura (TSE)"
                    value={id}
                    onChangeText={setId}
                    autoCorrect={false}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => confirmEmailRef.current.focus()}
                />
                <Button title="Próximo" callback={() => setFormIndex(3)} />
                <Button
                    title="Voltar"
                    background="#ddd"
                    callback={() => setFormIndex(1)}
                />
            </>
        );
    }

    function thirdForm() {
        return (
            <>
                <ImagePickerView onPress={() => handleImagePicker()}>
                    {photo == null && <Text>Adicione sua foto</Text>}
                    {photo && <Photo source={{uri: photo.uri}} />}
                </ImagePickerView>
                <Button title="Próximo" callback={() => setFormIndex(4)} />
                <Button
                    title="Voltar"
                    background="#ddd"
                    callback={() => setFormIndex(2)}
                />
            </>
        );
    }

    function fourthForm() {
        return (
            <>
                <AboutView>
                    <AboutInput
                        multiline={true}
                        numberOfLines={20}
                        maxLength={600}
                        placeholder="Sobre o candidato"
                        value={about}
                        onChangeText={setAbout}
                        returnKeyType="send"
                        onSubmitEditing={handleSignUp}
                    />
                    <Button title="Próximo" callback={() => handleSignUp()} />
                </AboutView>
            </>
        );
    }

    return (
        <Container>
            <Form>
                {formIndex === 1 && firstForm()}
                {formIndex === 2 && secondForm()}
                {formIndex === 3 && thirdForm()}
            </Form>
        </Container>
    );
};

export default SignUp;
