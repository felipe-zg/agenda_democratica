import React, {useState, useRef} from 'react';
import {View, Image} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

import Container from '../../../../components/Container';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import {
    Form,
    AboutView,
    AboutInput,
    ImagePickerTouch,
    Photo,
    ButtonsView,
} from './styles';

const SignUp = ({navigation}) => {
    const [formIndex, setFormIndex] = useState(1);
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [name, setName] = useState('');
    const [campaignName, setCampaignName] = useState('');
    const [viceName, setViceName] = useState('');
    const [party, setParty] = useState('');
    const [number, setNumber] = useState('');
    const [id, setId] = useState('');

    const [photo, setPhoto] = useState(null);
    const [about, setAbout] = useState('');

    const confirmEmailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    function getCandidate(uId) {
        return {
            name,
            campaignName,
            party,
            number,
            id,
            about,
            uId,
        };
    }

    // function IsEmail(email) {
    //     var exclude = /[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
    //     var check = /@[w-]+./;
    //     var checkend = /.[a-zA-Z]{2,3}$/;
    //     if (
    //         email.search(exclude) != -1 ||
    //         email.search(check) == -1 ||
    //         email.search(checkend) == -1
    //     ) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    function inputsAreEqual(input1, input2) {
        if (input1 !== input2) {
            return false;
        }
        return true;
    }

    function handleFirstForm() {
        if (
            email === '' ||
            confirmEmail === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            Toast.show('Todos os campos são obrigatórios');
            return;
        }
        if (!inputsAreEqual(email, confirmEmail)) {
            Toast.show('Os e-mails são diferentes');
            return;
        }
        if (!inputsAreEqual(password, confirmPassword)) {
            Toast.show('As senhas são diferentes');
            return;
        }
        setFormIndex(2);
    }

    function handleSignUp() {
        try {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async () => {
                    const user = auth().currentUser;
                    await user.updateProfile({
                        displayName: name,
                    });
                    let uId = user.uid;
                    database().ref('/candidates').push(getCandidate(uId));

                    Toast.show('Cadastro realizado com sucesso');
                    navigation.replace('CandidateDashboardScreen');
                })
                .catch((e) => {
                    Toast.show('Algo deu errado no cadastro :(');
                });
        } catch (e) {
            Toast.show('Algo deu errado no cadastro :(');
        }
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
                <Button title="Próximo" callback={() => handleFirstForm()} />
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
                    placeholder="Nome do vice"
                    value={viceName}
                    onChangeText={setViceName}
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
                    placeholder="Nº registro da candidatura (TSE)"
                    value={id}
                    onChangeText={setId}
                    autoCorrect={false}
                    autoCapitalize="words"
                    returnKeyType="send"
                    onSubmitEditing={() => setFormIndex(3)}
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
                <ImagePickerTouch onPress={() => handleImagePicker()}>
                    {photo == null && <Text>Adicione sua foto</Text>}
                    {photo && <Photo source={{uri: photo.uri}} />}
                </ImagePickerTouch>
                <ButtonsView>
                    <Button title="Próximo" callback={() => setFormIndex(4)} />
                    <Button
                        title="Voltar"
                        background="#ddd"
                        callback={() => setFormIndex(2)}
                    />
                </ButtonsView>
            </>
        );
    }

    function fourthForm() {
        return (
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
                <Button
                    title="Voltar"
                    background="#ddd"
                    callback={() => setFormIndex(3)}
                />
            </AboutView>
        );
    }

    return (
        <Container>
            {formIndex !== 3 && (
                <Form>
                    {formIndex === 1 && firstForm()}
                    {formIndex === 2 && secondForm()}
                    {formIndex === 4 && fourthForm()}
                </Form>
            )}
            {formIndex === 3 && thirdForm()}
        </Container>
    );
};

export default SignUp;
