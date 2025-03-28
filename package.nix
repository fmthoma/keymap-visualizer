{
  lib,
  fetchFromGitHub,
  buildNpmPackage,
  electron_34,
  makeWrapper,
  writeShellScriptBin,
  symlinkJoin,
}:

let
  electron = electron_34;

  keymapVisualizerApp = buildNpmPackage rec {
    pname = "keymap-visualizer";
    version = "0.1.0";

    src = ./.;

    npmDepsHash = "sha256-MmO4BBbu4U/Fc4SO+qb3nX3M0gAvY9fu8cvr8Ag99Z0=";
    npmBuildScript = "build";
    makeCacheWritable = true;

    nativeBuildInputs = [ makeWrapper ];

    env.ELECTRON_SKIP_BINARY_DOWNLOAD = "1";

    postBuild = ''
      # electronDist needs to be writable
      cp -r ${electron.dist} electron-dist
      chmod -R u+w electron-dist

      npm exec electron-builder -- \
          --publish never \
          --dir \
          -c.electronDist=electron-dist \
          -c.electronVersion=${electron.version}
    '';

    installPhase = ''
      runHook preInstall

      mkdir --parents \
        $out/bin \
        $out/share

      readonly dist=release/build/linux-unpacked

      cp -a $dist/resources $out/share/${pname}

      makeWrapper '${lib.getExe electron}' $out/bin/${pname}-app \
        --set-default ELECTRON_IS_DEV 0 \
        --set-default RESOURCES_PATH $out/share/${pname}/assets \
        --add-flags $out/share/${pname}/app.asar \
        --add-flags "\''${NIXOS_OZONE_WL:+\''${WAYLAND_DISPLAY:+--ozone-platform-hint=auto --enable-features=WaylandWindowDecorations --enable-wayland-ime=true}}"

      runHook postInstall
    '';

    meta = {
      description = "Visualize my QMK keymaps";
      homepage = "https://github.com/fmthoma/keymap-visualizer";
      platforms = electron.meta.platforms;
    };
  };

  wrapper = writeShellScriptBin "keymap-visualizer" ''
    (echo -n "toggle" | nc -UN /tmp/keymap.sock) || exec ${keymapVisualizerApp}/bin/keymap-visualizer-app "$@"
  '';

in symlinkJoin {
  name = "keymap-visualizer";
  paths = [ keymapVisualizerApp wrapper ];
  meta = keymapVisualizerApp.meta // {
    mainProgram = "keymap-visualizer";
  };
}
