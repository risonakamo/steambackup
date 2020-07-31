import fs from "fs-extra";
import path from "path";

const _steamUserFolder:string="C:/Program Files (x86)/Steam/userdata/88938168";
const _backupOutput="steambackup";

function main():void
{
    if (!fs.existsSync(_steamUserFolder))
    {
        console.log("steam user folder not found, exiting");
        return;
    }

    fs.ensureDirSync(_backupOutput);

    steamExtract(_steamUserFolder,"760/screenshots.vdf",_backupOutput);
    steamExtract(_steamUserFolder,"config/localconfig.vdf",_backupOutput);
    steamExtract(_steamUserFolder,"config/shortcuts.vdf",_backupOutput);
    steamExtract(_steamUserFolder,"7/remote/sharedconfig.vdf",_backupOutput);
    steamExtract(_steamUserFolder,"241100/remote",_backupOutput,"controller-remote");
}

// given the steam user folder, a relative path to a file from that folder, and
// a path to the folder to backup in, copy the target file to the folder.
// give rename outut to change output name, default is the same as input.
function steamExtract(userfolder:string,relpath:string,backuppath:string,
    renameOutput?:string):void
{
    console.log("extracting ",relpath);
    var outputName:string=renameOutput?renameOutput:path.basename(relpath);

    fs.copy(
        path.join(userfolder,relpath),
        `${backuppath}/${outputName}`,
        (err:any)=>{
            if (err)
            {
                console.log(err);
            }
        }
    );
}

main();