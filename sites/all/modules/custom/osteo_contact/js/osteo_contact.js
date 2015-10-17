function isEmail(myVar){
     // La 1ère étape consiste à définir l'expression régulière d'une adresse email
     var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');

     return regEmail.test(myVar);
}

function controle_mail() {
	var email = jQuery('#edit-mail').val();
	if (isEmail(email)==false) {
		jQuery('#email-error').text("Le champs renseigné n'est pas correct");
		jQuery('#email-error').addClass('span-email-error');
	} else {
		jQuery('#email-error').empty('');
		jQuery('#email-error').removeClass('span-email-error');
	}
}
