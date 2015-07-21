<?php
/**
 * UTILS sur les fichiers
 */

/**
 * Récupère les informations d'un fichier
 *
 * @param array $file       Tableau du fichier
 * @return array            Tableau avec 'type_orig' 'taille_orig' 'titre_format'
 */
function file_utils_human_fileinfos($file = '')
{
    $return = false;
    if (isset($file) && !empty($file)) {
        $output_main = array();
        $output_second = array();

        // Nom du fichier
        if (isset($file['filename']) && $file['filename'] != '') {
            $output_main[] = ((isset($file['description']) && $file['description'] != '') ? truncate_utf8($file['description'], 45) : truncate_utf8($file['filename'], 45));
        }

        // Type de fichier
        if (isset($file['filemime']) && $file['filemime'] != '') {
            $return['type_orig'] = $file['filemime'];
            $type = '';
            // Copie de code précédent -> TODO : à changer pour uniformiser sur tous les types de fichiers
            if (($i = strpos($file['filemime'], '/')) !== FALSE) {
                $type = substr($file['filemime'], $i + 1);
                if (!empty($type)) {
                    $type = strtoupper($type);
                }
            }
            $output_second[] = $type;
        }

        // Taille du fichier
        if (isset($file['filesize']) && $file['filesize'] != '') {
            $return['taille_orig'] = $file['filesize'];
            $output_second[] = file_utils_human_filesize($file['filesize']);
        }
        if (!empty($output_second)) {
            $output_main[] = '('.implode(', ', $output_second).')';
        }
        $return['titre_format'] = implode(' ', $output_main);
    }
    return $return;
}

/**
 * Taille de fichier lisible
 */
function file_utils_human_filesize($taille)
{
    if ($taille >= 1073741824) {
        $taille = round($taille / 1073741824 * 100) / 100 . " Go";
    } elseif ($taille >= 1048576) {
        $taille = round($taille / 1048576 * 100) / 100 . " Mo";
    } elseif ($taille >= 1024) {
        $taille = round($taille / 1024 * 100) / 100 . " Ko";
    } else {
        $taille = $taille . " octets";
    }
    if ($taille == 0) {
        $taille = "-";
    }
    return $taille;
}